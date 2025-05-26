import * as vscode from "vscode";
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { generateText, LanguageModelV1 } from "ai";

export class TranslateService {
  private model: LanguageModelV1 | null = null;

  constructor() {
    this.initializeModel();
  }

  private initializeModel() {
    const config = vscode.workspace.getConfiguration("varTransAI");
    const apiKey = config.get<string>("apiKey");
    const baseUrl = config.get<string>("baseUrl");
    const provider = config.get<string>("modelProvider") || "openai";
    const modelName = config.get<string>("modelName") || "gpt-4o";

    if (!apiKey) {
      throw new Error("API key not configured");
    }

    const modelConfig: any = {
      temperature: 0.3,
    };

    if (baseUrl) {
      modelConfig.baseURL = baseUrl;
    }

    switch (provider) {
      case "openai":
        this.model = createOpenAI({
          apiKey,
          ...modelConfig,
        })(modelName)
        break;
      case "anthropic":
        this.model = createAnthropic({
          apiKey,
          ...modelConfig,
        })(modelName)
        break;
      case "openai-compatible":
        this.model = createOpenAICompatible({
          apiKey,
          baseURL: baseUrl,
         ...modelConfig,
        }).chatModel(modelName);
      default:
        throw new Error(`Unsupported model provider: ${provider}`);
    }
  }

  public async translateVariable(
    text: string,
    lines: string,
    language: string
  ): Promise<string> {
    if (!this.model) {
      throw new Error("Model not initialized");
    }

    let guidelines = '';
    
    switch (language) {
        case 'javascript':
        case 'typescript':
            guidelines = `
            - Variables/functions: camelCase
            - Constants: UPPER_SNAKE_CASE
            - Classes: PascalCase
            - Private members: _camelCase prefix
            `;
            break;
        case 'python':
            guidelines = `
            - Variables/functions: snake_case
            - Constants: UPPER_SNAKE_CASE
            - Classes: PascalCase
            - Private members: _snake_case prefix
            `;
            break;
        case 'java':
            guidelines = `
            - Variables/methods: camelCase
            - Constants: UPPER_SNAKE_CASE
            - Classes/interfaces: PascalCase
            - Packages: lowercase
            `;
            break;
        case 'go':
            guidelines = `
            - Variables/functions: camelCase (exported: PascalCase)
            - Constants: camelCase or PascalCase
            - Packages: lowercase
            `;
            break;
        case 'rust':
            guidelines = `
            - Variables/functions: snake_case
            - Constants: UPPER_SNAKE_CASE
            - Types/traits: PascalCase
            - Modules: snake_case
            `;
            break;
        default:
            guidelines = 'No specific guidelines available for this language.';
    }
    
    const prompt = `
        You are a programming assistant that helps translate variable names from Chinese to English.
    
        Context:
        - Programming Language: ${language}
        - Original Chinese text: ${text}
        - Code context (lines around the target text, separated by newlines): ${lines}
    
        Please translate the Chinese variable name to English following these guidelines:
    
        ${guidelines}
    
        ## Rules:
        1. Analyze code context to determine identifier type and apply correct naming convention
        2. Use descriptive English words maintaining semantic meaning
        3. Handle limited context gracefully
        4. Output only the translated identifier name    
    `;

    try {
      const { text } = await generateText({
        model: this.model,
        prompt,
      });

      return String(text).trim();
    } catch (error) {
      throw new Error(`Translation failed: ${error}`);
    }
  }

  public updateModel() {
    this.initializeModel();
  }
}
