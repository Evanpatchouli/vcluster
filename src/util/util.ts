import { useIntl } from "react-intl";
import { useAppDispatch } from "../store/hook";
import { showMsg, closeMsg } from "../store/msg/msg.reducer";
import { useNavigate } from "react-router";
import { NavigateFunction } from "react-router-dom";

/**
 * message will disappear after 2 seconds
 * @param content message content
 * @returns 
 */
export const msg2s = (content: string, severity:"info"|"success"|"warning"|"error")=>{
  useAppDispatch(showMsg({
    content, severity
  }));
  setTimeout(()=>{
    useAppDispatch(closeMsg());
  }, 2000)
}

/**
 * msec should be milliseconds and should be a number >= 0
 * @param content message content
 * @param msec milliseconds timeout
 * @returns 
 */
export const msgms = (content: string, severity:"info"|"success"|"warning"|"error", msec?: number)=>{
  if (msec && msec < 0) {
    return console.warn("timout cannot be negative");
  }
  useAppDispatch(showMsg({
    content, severity
  }));
  if(msec) {
    setTimeout(()=>{
      useAppDispatch(closeMsg());
    }, msec)
  }
}

/**
 * change route to given route path
 * @param path route path
 */
export const routeTo = (path: string, link: NavigateFunction) => {
  link(path, {replace: true});
}