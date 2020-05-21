# ajax 下载文件
```
handleExport = () => {
    const {selectedRowKeys} = this.state;

    if (!selectedRowKeys || !selectedRowKeys.length) {
        return notification.info({
            message: '提示',
            description: '请选择您所需要导出的数据！',
        });
    }

    this.props.ajax.post(`/etSys/exportProject?projectNodeId=${selectedRowKeys.join(",")}`)
        .then(res => {
           this.saveShareContent(res, "导出.xml")
        })

};

saveShareContent = (content, fileName) =>{
    let downLink = document.createElement('a');
    downLink.download = fileName;
    //字符内容转换为blod地址
    let blob = new Blob([content]);
    downLink.href = URL.createObjectURL(blob);
    // 链接插入到页面
    document.body.appendChild(downLink);
    downLink.click();
    // 移除下载链接
    document.body.removeChild(downLink)
};
```

后端返回headers设置：
```
content-disposition: attachement;filename=xxx.xml
content-type: application/octet-stream;charset=UTF-8
```