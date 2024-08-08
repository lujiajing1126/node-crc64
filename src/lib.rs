#![deny(clippy::all)]

use crc64fast::Digest;
use napi::{bindgen_prelude::Either, JsBuffer, Result};

#[macro_use]
extern crate napi_derive;

#[napi]
pub struct Crc64 {
    d: Digest,
}

#[napi]
impl Crc64 {
    #[napi(constructor)]
    pub fn new() -> Self {
        Crc64 { d: Digest::new() }
    }

    /// Class method
    #[napi]
    pub fn update(&mut self, input: Either<String, JsBuffer>) -> Result<()> {
        match input {
            Either::A(s) => {
                self.d.write(s.as_bytes());
            }
            Either::B(b) => {
                let b = b.into_value()?;
                self.d.write(&b);
            }
        };
        Ok(())
    }

    #[napi]
    pub fn sum(&self) -> String {
        self.d.sum64().to_string()
    }
}

#[napi(js_name = "crc64Sync")]
pub fn crc64(input: Either<String, JsBuffer>) -> Result<String> {
    let mut c = Digest::new();
    match input {
        Either::A(s) => {
            c.write(s.as_bytes());
        }
        Either::B(b) => {
            let b = b.into_value()?;
            c.write(&b);
        }
    };
    Ok(c.sum64().to_string())
}