use async_trait::async_trait;

#[async_trait]
pub trait Crud<P,S> {
  async fn sel_by_pk(pk: &str) -> Option<P>;

  // async fn sel_by_key(key: &str, val: V) -> Option<Vec<P>>;

  async fn sel_all() -> Option<Vec<P>>;

  async fn ins(item: &mut P);

  async fn del_by_pk(pk: &str);

  #[allow(unused)]
  fn schema() -> S;
}