import React, { useEffect } from 'react'
import { notification } from 'antd';

// 封装消息框
export default function MyNotification({notiMsg}) {
  const [api, contextHolder] = notification.useNotification();
  useEffect(()=>{
    if (notiMsg.type) {
      api[notiMsg.type]({
        message:'系统提示',
        description:notiMsg.description,
        duration:2,
        placement:'bottomRight'
      })
    }
  },[notiMsg,api])

  return (
    <>
      {contextHolder}
    </>
  )
}
