use once_cell::sync::Lazy;
use serde_json::Value;
use wasm_bindgen::prelude::*;

use lindera::dictionary::{load_dictionary_from_kind, DictionaryKind};
use lindera::mode::Mode;
use lindera::segmenter::Segmenter;
use lindera::token::Token;
use lindera::tokenizer::Tokenizer;

static TOKENIZER: Lazy<Tokenizer> = Lazy::new(|| {
    let dictionary = load_dictionary_from_kind(DictionaryKind::IPADIC).unwrap();
    let segmenter = Segmenter::new(
        Mode::Normal,
        dictionary,
        None, // no user dictionary is provided
    );
    Tokenizer::new(segmenter)
});

fn token_to_json(token: &mut Token) -> Value {
    serde_json::json!({
        "text": token.text,
        "details": token.details().clone(),
        "byte_start": token.byte_start,
        "byte_end": token.byte_end,
        "word_id": token.word_id,
    })
}

#[wasm_bindgen]
pub fn tokenize(input_text: &str) -> JsValue {
    let mut tokens = TOKENIZER.tokenize(input_text).unwrap();

    serde_wasm_bindgen::to_value(
        &tokens
            .iter_mut()
            .map(|token| token_to_json(token))
            .collect::<Vec<_>>(),
    )
    .unwrap()
}

#[cfg(test)]
mod tests {
    #[cfg(target_arch = "wasm32")]
    use wasm_bindgen_test::wasm_bindgen_test;

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen_test]
    fn test_tokenize() {
        use super::*;
        use serde_json::Value;
        let t = tokenize("関西国際空港限定トートバッグ");
        let tokens: Vec<Value> = serde_wasm_bindgen::from_value(t).unwrap();

        assert_eq!(tokens.len(), 3);
        assert_eq!(tokens[0].get("text").unwrap(), "関西国際空港");
        assert_eq!(tokens[1].get("text").unwrap(), "限定");
        assert_eq!(tokens[2].get("text").unwrap(), "トートバッグ");
    }
}
