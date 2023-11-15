use crate::{
    interface::crud::Crud,
    model::{
        resp::{self, Resp},
        PkgConfig, ServiceConfig,
    },
};

#[allow(dead_code, unused_variables)]
#[tauri::command]
pub async fn create_app(app: ServiceConfig) -> Resp<'static, ()> {
    match app.cluster_id.clone() {
        Some(_) => {}
        None => return resp::fail("cluster_id is not given", -1),
    }
    let cluster = PkgConfig::sel_by_pk(&app.cluster_id.clone().unwrap()).await;
    match cluster {
        Some(_) => {}
        None => return resp::fail("cluster is not exist", -2),
    }
    ServiceConfig::ins(&mut app.clone()).await;
    return resp::ok("craete a subapp success", 1);
}

#[allow(dead_code, unused_variables)]
#[tauri::command]
pub async fn del_app_by_pk(pk: String) -> Resp<'static, ()> {
    ServiceConfig::del_by_pk(&pk).await;
    return resp::ok("delete a app success", 1);
}
