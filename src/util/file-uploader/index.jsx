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
    constructor(props){
        super(props);
    }
    componentDidMount(){
        Qiniu.uploader({
            runtimes: 'html5,flash,html4',
            browse_button: 'pickfiles',
            flash_swf_url: 'https://cdn.bootcss.com/plupload/2.1.1/Moxie.swf',
            chunk_size: '4mb',
            uptoken_url: '/admin/upload',
            domain: 'http://pbp1e6s89.bkt.clouddn.com/',
            get_new_uptoken: false,
            auto_start: true,
            max_retries: 2,
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
    }
    render() {
        return (
            <div id='container'>
                <a href='javascript:;' id="pickfiles">上传按钮</a>
            </div>
        )
    }
}
export default FileUploader;