use chrono::{DateTime, Utc, FixedOffset};

pub fn now_time() -> String{
    let now: DateTime<Utc> = Utc::now();
    let timezone_east = FixedOffset::east_opt(8 * 60 * 60).unwrap();
    let now = now.with_timezone(&timezone_east);
    format!("{}", now.format("%Y-%m-%d %H:%M:%S"))
}