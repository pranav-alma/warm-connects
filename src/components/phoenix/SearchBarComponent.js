import React from "react";
import axios from "axios";
import lodash, {debounce} from "lodash";
import URL from "url";
import { FaSearch } from 'react-icons/fa';
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from '@material-ui/core/styles';

export default class SearchBarComponent extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      displayable: "none",
      searched_items: this.tmp,
      searched_items: [],
      query_term: null,
    }
    this.debefunction = debounce((val) => {
      axios.get(URL.resolve(this.props.metadata.network_base_url, "/suggestions/username.json?"), {params: {institute_id: this.props.metadata.institute_id, q: this.state.query_term}}).then((response) => {
          this.setState({...this.state, searched_items: response.data, displayable: "block"})
      }).catch(e => {
          this.setState({...this.state, displayable: "block"})
        });

    }, 400)
  }

  handleChange = (e) => {
    this.setState({...this.state, query_term: e.target.value});
    this.debefunction(e.target.value)
  }

  handleOnFocus =() => {
    this.setState({query_term: null, searched_items: [], displayable: (this.state.query_term ? "block": "none")})
  }

  handleDefocus = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
        this.setState({...this.state, query_term: null, displayable: 'none'})
    }
    else{
       window.location = e.relatedTarget.href
    }
  }

  renderList= () => {
      return(
        this.state.searched_items.map((item) => (
            <a href={item.url} className="list_item">
                <Avatar>
                    <img src={item.avatar ? item.avatar : ""} alt={item.name} style={{maxWidth: "100%"}}/>
                </Avatar>
                <div style={{marginLeft: 30, letterSpacing: "1.2px", fontSize: 14, fontWeight: "500"}}>
                    {item.name}
                </div>
            </a>
        ))
      )
  }
  renderNoneFound = () => {
      return(
          <div style={{padding: 12}}>No user found</div>
      )
  }
  render(){
    return(
      <>
        <div style={{width: "100%", position: "absolute"}} onFocus={this.handleOnFocus} onBlur={this.handleDefocus}>
            <div className="search_bar_user">
                <FaSearch style={{fontSize: 22}}/>
                <input type="text" placeholder="Search for an alum...." value={this.state.query_term} onChange={e => this.handleChange(e)}></input>
            </div>
            <div className="search_results" style={{display: this.state.displayable}}>
                {
                    this.state.searched_items.length > 0 ? this.renderList() : this.renderNoneFound()
                }
            </div>
        </div>
      </>
    )
  }
}
