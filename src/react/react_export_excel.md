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
import iconv from 'iconv-lite';

handleExport = () => {
    this.props.ajax.get('/invitee/download', null, {
        successTip: '导出成功！',
        originResponse: true, // 框架封装，获取响应全部信息
        responseType: 'blob' // 必须 限制返回类型
    })
        .then(res => {
            const link = document.createElement('a');
            const fileName = res.headers['content-disposition'].split('=')[1];
            const blob = new Blob([res.data], {type: res.headers['content-type']});

            // 最好加一层校验 不存在则停止下载 因为如果取不到fileName 一般是后台返回格式错误
            if(!fileName) return openNotificationWithIcon('error', '导出失败～');

            iconv.skipDecodeWarning = true; // 忽略警告
            let name = iconv.decode(fileName, 'utf-8'); // 解决文件名中文乱码
        
            link.setAttribute('href', window.URL.createObjectURL(blob));
            link.setAttribute('download', decodeURIComponent(name));
            link.style.visibility = 'hidden';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
};
```

## 补充
项目中导出表格、图片或压缩包等文件时，如果有需求**让导出的文件名称由后端来定义**。

则必须要求后端返回的为**文件流**，并在响应头带上文件名称。而**不能是一个下载链接**。

因为如果是下载链接的话，我们可以通过a标签去下载，但是a标签的download属性无法定义文件名称，因为**download属性不支持跨域的链接**。
