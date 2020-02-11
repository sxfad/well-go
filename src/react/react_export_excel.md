# 基于react导出表格

## 前端导出
借助 xlsx-oc 插件可实现最基础的表格导出，如果涉及到表格的合并等前端实现起来比较麻烦。
```js
yarn add xlsx-oc
```
```js
import { exportExcel } from 'xlsx-oc';

handleExport = () => {
    const {data} = this.state; 
    const _headers = []; 

    _headers.push({
        k: 'num', // k值对应data中的dataIndex
        v: '序号'
    },{
        k: 'name',
        v: '节点名称'
    },{
        k: 'type',
        v: '节点类型'
    });

    exportExcel(_headers, data); // (导出的表格头, 表格数据源)
};
```
## 后端导出
后端返回的需要是一个文件流，前端解析文件流，写入excel。
```js
handleExport = () => {
    this.props.ajax.get('/invitee/download', null, {
        successTip: '导出成功！',
        originResponse: true, // 框架封装，获取响应全部信息
        headers: {
            'content-type': 'application/vnd.ms-excel;charset=utf-8', // 必须 和后台content-type对应上
        },
        responseType: 'blob' // 必须 限制返回类型
    })
        .then(res => {
            const reg = /[a-zA-Z0-9%]+.xlsx/g;
            const fileName = reg.exec(res.headers['content-disposition'])[0]; // 看需求 文件名可从后端拿也可前端写死
            const link = document.createElement('a');
            const blob = new Blob([res.data], {type: res.headers['content-type']});

            link.setAttribute('href', window.URL.createObjectURL(blob));
            link.setAttribute('download', decodeURIComponent(fileName));
            link.style.visibility = 'hidden';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
};
```
