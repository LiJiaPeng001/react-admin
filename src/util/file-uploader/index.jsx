/*
* @Author: Rosen
* @Date:   2018-02-02 12:24:13
* @Last Modified by:   Rosen
* @Last Modified time: 2018-02-02 16:29:06
*/
import React from 'react';
require('./index.scss');
import MUtil                from 'util/mm.jsx'

const _mm           = new MUtil();

class FileUploader extends React.Component {
    render() {
        Qiniu.uploader({
            runtimes: 'html5,flash,html4',
            browse_button: 'pickfiles',
            flash_swf_url: 'https://cdn.bootcss.com/plupload/2.1.1/Moxie.swf',
            chunk_size: '4mb',
            // uptoken_url: '/admin/upload',
            uptoken : 'C-MFZT4qGCOZqOlZ04-96mnLlvM15B1ovq3pEhY2:A-ZslLztTF11eWBUjjkZgnw0SW0=:eyJzY29wZSI6Im1jbGpwIiwiZGVhZGxpbmUiOjE1MzIyNDkxODN9',
            domain: 'http://pbp1e6s89.bkt.clouddn.com/',
            get_new_uptoken: false,
            auto_start: true,
            max_retries: 3,
            filters: {
                max_file_size: '10000mb',
                prevent_duplicates: false
            },
            init: {
                FileUploaded: (up, file, info) => {
                    var info = JSON.parse(info);
                    var key = 'http://pbp1e6s89.bkt.clouddn.com/' + info.key;
                    this.props.onuploaderKey(key);
                },
                Error: (up, err, errTip) => {
                    _mm.errorTips(errTip)
                },
            }
        });
        return (
            <div id="container">
                <a href='javascript:;' id="pickfiles">上传按钮</a>
            </div>
        )
    }
}
export default FileUploader;