import React from "react";
import { Input } from "antd";
import { Button } from "antd";
import "../App.scss";
import {PlusCircleFilled} from '@ant-design/icons'
import {EditFilled } from '@ant-design/icons'
import {CheckOutlined} from '@ant-design/icons'
import {CloseCircleFilled} from '@ant-design/icons'
class Add extends React.Component {
  constructor() {
    super();
    this.state = {
      selectmsg: "",
      // ----------所有的背景颜色
      color: ["b1", "b2", "b3", "b4", "b5", "b6", "b7"],
      // -----------颜色选择
      check: 1,
      //   --------------------总的标签
      tagindex:0,
      tags: [
        {
          name: "紧急",
          color: "b2",
          isadd: false,
        },
      ],
      // -----------------显示的标签
      tagsshow: [],
      // -----------------在标签框查询时判断有无标签存在
      istaghave: true,
      // ----------------修改标签时暂存的数据
      rewritingmsg: {},
      // ---------------是否正在修概述局，调出数据修改框
      rewriting: false,

      // ———————————————————这个是一个头部文件

      //标签编辑模板
      adding: false,
    };
  }

  render() {
    var items = [];
    for (var i = 0; i < 7; i++) {
      items.push(
        <input
          type="radio"
          id={"t" + (i + 1)}
          name="color"
          checked={this.state.check === i + 1}
          value={i + 1}
          className="itemradio"
          onChange={(e) => this.radiochange(e)}
          
        />
      );
      items.push(
        <label 
          htmlFor={"t" + (i + 1)}
          className={"itemlabel " + this.state.color[i]}
        >
         {this.state.check == (i + 1)?<CheckOutlined />:''}
        </label>
      );
    }
    var tagsrewrite = (
      <div
        className="changetag"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="itemhead">添加标签</div>
        <div className="iteminput">
          <Input
            placeholder="Basic usage"
            className="itemin"
            value={this.state.rewritingmsg.name}
            onChange={(e) => this.rewritingmsg(e)}
          />
        </div>
        <div className="itemchange">{items}</div>
        <div className="itemselect">
          <Button
            size="large"
            className="bt bt1"
            onClick={() => this.tagdelete()}
          >
            删除
          </Button>
          <Button
            size="large"
            className="bt bt2"
            onClick={() => this.tagchanged()}
          >
            完成
          </Button>
        </div>
      </div>
    );
    var tagshow = this.state.tagsshow.map((item, index) => {
      return (
        <div
          className="itemlist"
          onClick={() => this.addtohead(item)}
          key={item.name}
        >
          <div className={item.color + " item1"}></div>{" "}
          <div className="item2">{item.name}</div>{" "}
          <div className="item3" onClick={(e) => this.rewrite(e, item, index)}>
          <EditFilled />
          </div>
      <div className="item4">{item.isadd?<CheckOutlined />:''}</div>
        </div>
      );
    });
    var addtag = (
      <div className="createtag">
        <div className="itemed">{items}</div>
        <div className="itembt">
          <Button
            type="primary"
            size="large"
            onClick={() => this.addtag()}
            className="bt"
          >
            创建标签
          </Button>
        </div>
      </div>
    );
    var outtagpage = (
      <div onClick={(e) => this.show(e)} className="addtag">
        <Input
          placeholder="Basic usage"
          value={this.state.selectmsg}
          onChange={(e) => this.selectmsgchange(e)}
        />
        {this.state.istaghave ? tagshow : addtag}
      </div>
    );
    var addtaghead = (
      <div  className="addtaghead">
        <div className="topadd">
        {
          this.state.tagindex===0?<div onClick={(e) => this.addCom(e)}>添加标签</div>:<PlusCircleFilled style={{fontSize:"25px"}} onClick={(e) => this.addCom(e)} className="btadd"/>
        }
          {this.state.adding
            ? this.state.rewriting
              ? tagsrewrite
              : outtagpage
            : ""}
        </div>
      </div>
    );
    return (
      <div onClick={(e) => this.hide(e)} id="main">
        <div className="headtag">
          {this.state.tags.map((item, index) => {
            if (item.isadd === true) {
              return (
                <div className={"item " + item.color} key={item.name}>
                  {item.name}{" "}
                  <div className="delete" onClick={() => this.todelete(index)}>
                  <CloseCircleFilled />
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
          {addtaghead}
        </div>
      </div>
    );
  }
  componentWillMount() {
    this.setState({
      tagsshow: this.state.tags,
    });
  }
  tagdelete() {
    console.log("你选择了删除");
    this.state.tags.splice(this.state.rewritingmsg.index, 1);
    this.setState({
      tags: this.state.tags,
      rewriting: false,
    });
  }
  tagchanged() {
    console.log(this.state.rewritingmsg);
    this.state.tags[this.state.rewritingmsg.index].name = this.state.rewritingmsg.name;
    this.state.tags[this.state.rewritingmsg.index].color = this.state.color[
      this.state.check - 1
    ];
    // this.state.tag[this.state.rewritingmsg.index].name=this.state.rewritingmsg.name
    this.setState({
      tags: this.state.tags,
      rewriting: false,
    });
  }
  selectmsgchange(e) {
    this.setState({
      selectmsg: e.target.value,
    });
    this.findtag(e.target.value);
  }
  findtag(msg) {
    if (msg === "") {
      this.setState({
        tagsshow: this.state.tags,
      });
    } else {
      let arr = [];
      this.state.tags.forEach((item) => {
        if (item.name.includes(msg)) {
          arr.push(item);
        }
      });
      if (arr.length !== 0) {
        this.setState({
          tagsshow: arr,
          istaghave: true,
        });
      } else {
        this.setState({
          istaghave: false,
        });
      }
    }
  }
  rewritingmsg(e) {
    this.state.rewritingmsg.name = e.target.value;
    this.setState({
      rewritingmsg: this.state.rewritingmsg,
    });
  }
  addtag() {
    console.log(this.state.selectmsg);
    console.log(this.state.check);
    var newtag = {
      name: this.state.selectmsg,
      color: this.state.color[this.state.check - 1],
      isadd: true,
    };
    this.state.tags.push(newtag);
    this.setState({
      selectmsg: "",
      istaghave: true,
      tagsshow: this.state.tags,
    });
  }
  todelete(index) {
    this.state.tags[index].isadd = false;
    this.setState({
      tags: this.state.tags,
    });
  }
  addtohead(item) {
    this.state.tags.forEach((sitem, index) => {
      if (sitem.name === item.name) {
        this.state.tags[index].isadd = true;
        this.setState({
          tags: this.state.tags,
        });
      }
    });
  }
  // --------------当点击标签修改时触发的事件，在此事件里要获取到当前的标签信息
  rewrite(e, item, index) {
    console.log(item);
    this.state.rewritingmsg.name = item.name;
    this.state.rewritingmsg.color = item.color;
    this.state.rewritingmsg.isadd = item.isadd;
    this.state.rewritingmsg.index = index;
    this.setState({
      rewriting: true,
      rewritingmsg: this.state.rewritingmsg,
      check: item.color.slice(-1),
    });
    e.stopPropagation();
  }
  radiochange(e) {
    this.setState({
      check: e.target.value,
    });
  }
  addCom(e) {
    console.log(e.target);
    this.setState({
      adding: true,
    });
    e.stopPropagation();
  }
  // ------------阻止标签栏的冒泡
  show(e) {
    e.stopPropagation();
  }
  hide(e) {
    console.log("yyt");
    this.setState({
      adding: false,
      rewriting: false,
    });
  }
}
export default Add;
