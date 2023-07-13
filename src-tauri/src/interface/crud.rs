use async_trait::async_trait;

#[async_trait]
pub trait Crud<P,S> {
  async fn sel_by_pk(pk: &str) -> Option<P>;

  // async fn sel_by_key(key: &str, val: V) -> Option<Vec<P>>;

  #[allow(unused)]
  fn schema() -> S;
}