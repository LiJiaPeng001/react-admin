/*
* @Author: Rosen
* @Date:   2018-02-02 12:24:13
* @Last Modified by:   Rosen
* @Last Modified time: 2018-02-02 16:29:06
*/
import React        from 'react';
import FileUpload   from './react-fileupload.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import $ from 'jquery/dist/jquery.min.js';

class FileUploader extends React.Component{
    onSuccess(res){
        this.props.onChoose(res);
    }
    render(){
        const options={
            baseUrl         :'/manage/product/upload.do',
            fileFieldName   : 'upload_file',
            dataType        : 'json',
            chooseAndUpload : true,         
            uploadSuccess   : (res) => {
                this.props.onSuccess(res.data);
            },
            uploadError     : (err) => {
                
                this.props.onError(err.message || '上传图片出错啦');
            }
        }
        return (
            <FileUpload options={options}  onSuccess={(res)=>{this.onSuccess(res)}}>
                <button className="btn btn-xs btn-default" ref="chooseAndUpload">请选择图片</button>
            </FileUpload>
        )           
    }
}
export default FileUploader;