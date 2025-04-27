import { Pipe, PipeTransform } from '@angular/core';
import { marked } from 'marked';

@Pipe({
  name: 'markdown',
  pure: true
})
export class MarkdownPipe implements PipeTransform {
  async transform(content: string): Promise<string> {
    if (!content) return '';

    return await marked(content, { async: true });
  }
}
