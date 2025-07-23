import kuromoji from 'kuromoji';
import texts from '../src/lib/constants/text.json'  assert { type: "json" };;


export const tokenizeByJavaScript=(text)=> {
    const startTime = performance.now();

    return new Promise((resolve) => {
        kuromoji.builder({ dicPath: 'static/dict/' }).build(function (err, tokenizer) {
            const checkpoint = performance.now();
            tokenizer.tokenize(text)
            const endTime = performance.now();
            resolve({
                loadTime: checkpoint - startTime,
                executionTime: endTime - startTime
            });
        });
    });
};

async function main() {
   const resultJS=await tokenizeByJavaScript(texts[2]);
   console.log('dictionary loading time: '+ resultJS.loadTime)
   console.log('tokenizing time: '+ (resultJS.executionTime-resultJS.loadTime))
}

main()