import { TokenizerBuilder } from 'lindera-wasm';
import texts from '../src/lib/constants/text.json'  assert { type: "json" };;


export const tokenizeByWASM = async (text) => {
    const startTime = performance.now();

    const builder = new TokenizerBuilder();
    builder.set_dictionary_kind('ipadic');
    const tokenizer = builder.build();

    const checkpoint = performance.now();

    tokenizer.tokenize(text)
    const endTime = performance.now();
    
    return {
        loadTime: checkpoint - startTime,
        executionTime: endTime - startTime
    };
};

async function main() {
   const resultWASM=await tokenizeByWASM(texts[2]);
   console.log('dictionary loading time: '+ resultWASM.loadTime)
   console.log('tokenizing time: '+ (resultWASM.executionTime-resultWASM.loadTime))
}

main()