import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import prism from "prismjs";

window.Prism = prism;

import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

import "prismjs/plugins/toolbar/prism-toolbar.js"; // required for the following plugins
import "prismjs/plugins/toolbar/prism-toolbar.css"; // required for the following plugins
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.js"; // show copy button
import "prismjs/plugins/show-language/prism-show-language.js"; // display the language of the code block
import "prismjs/plugins/custom-class/prism-custom-class";

let renderer = new marked.Renderer();

renderer.code = function(code, lang, escaped) {
    if (this.options.highlight) {
        var out = this.options.highlight(code, lang);
        //if (out != null && out !== code) {  [*3]
        if (out != null) {
            escaped = true;
            code = out;
        }
    }

    if (!lang) {
        return `<pre class="${this.options.langPrefix}PLACEHOLDER"><code>`
            // + (escaped ? code : escape(code, true)) [1]
            + code
            + '\n</code></pre>';
    }

    let langText = this.options.langPrefix + escape(lang);
    return `<pre class="${langText}"><code class="${langText}">` // [2]
        + (escaped ? code : escape(code))
        + '\n</code></pre>\n';
};
marked.use(markedHighlight({
  langPrefix: 'prism line-numbers language-',
  highlight: (code, lang = 'html') => {
    if (prism.languages[lang]) {
      return prism.highlight(code, prism.languages[lang], lang);
    } else {
      return code;
    }
  },
}))

export {
    marked,
    prism
};