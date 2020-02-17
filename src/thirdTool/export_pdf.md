# 前端导出pdf
分类：前端插件导出、解析后台返回文件流导出。

## 前端插件导出
使用 html2canvas 和 jspdf 插件实现

### 安装
```js
yarn add html2canvas jspdf --save
```

### 使用
```js
import html2canvas from 'html2canvas';
import JSPDF from 'jspdf';

handleExport = () => {
    // this.text 是要导出的内容
    html2canvas(this.text, {
          backgroundColor: "transparent", // 解决虽是png图片但背景不透明
          allowTaint: true, // 解决跨域图片不显示问题
          useCORS: true  // 解决跨域图片不显示问题
    }).then(canvas => {
        const contentWidth = canvas.width;
        const contentHeight = canvas.height;

        // 一页pdf显示html页面生成的canvas高度;
        const pageHeight = contentWidth / 592.28 * 841.89;
        
        // 未生成pdf的html页面高度
        const leftHeight = contentHeight;
        
        // 页面偏移
        const position = 0;
        
        // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        const imgWidth = 585.28;
        const imgHeight = 592.28 / contentWidth * contentHeight;

        const pageData = canvas.toDataURL('image/jpeg', 1.0);

        const pdf = new JSPDF('', 'pt', 'a4');
        // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
        // 当内容未超过pdf一页显示的范围，无需分页
        if (leftHeight < pageHeight) {
            pdf.addImage(pageData, 'JPEG', 5, 42, imgWidth, imgHeight);
        } else {
            while (leftHeight > 0) {
                pdf.addImage(pageData, 'JPEG', 5, position+42, imgWidth, imgHeight);
                leftHeight -= pageHeight;
                position -= 841.89;
                if (leftHeight > 0) {
                    pdf.addPage();
                }
            }
        }

        pdf.save('report.pdf'); // 导出的pdf名字 
    });
}
```

## 解析后台返回文件流导出
利用html a标签的download属性实现下载
```js
handleExport = () => {
    this.props.ajax.get('/invitee/download', null, {
        successTip: '导出成功！',
        originResponse: true, // 框架封装，获取响应全部信息
        responseType: 'blob' // 必须 否则下载下来的pdf会是空白
    })
        .then(res => {
              const type = JSON.parse(res.headers)['content-type'];
              const fileName = JSON.parse(res.headers)['file-name'];
            
              // 创建blob对象，解析流数据
              const blob = new Blob([res], {
                type: type // 如果后端没返回下载文件类型，需要手动设置：type: 'application/pdf;chartset=UTF-8' 表示下载文档为pdf
              })
              
              const a = document.createElement('a');
              
              // 兼容webkix浏览器，处理webkit浏览器中href自动添加blob前缀，默认在浏览器打开而不是下载
              const URL = window.URL || window.webkitURL;
              
              // 根据解析后的blob对象创建URL 对象
              const herf = URL.createObjectURL(blob);
              
              // 下载链接
              a.href = herf;
              
              a.download = filename || '自定义.pdf';
              
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              
              // 在内存中移除URL 对象
              window.URL.revokeObjectURL(herf)
        })
};
```

