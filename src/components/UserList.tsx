import {useState, useEffect, FC} from 'react';
import {UserDetails} from '../Mapper/UserDetails';
import BootstrapTable from 'react-bootstrap-table-next';
import {connect} from 'react-redux';
import { filterByName, loadDate, fetchUsers } from '../actions/FilterAction';
import {store} from '../store';
import {UserState} from '../reducers/FilterReducer';

interface IUserList {
    users: UserDetails[],
    getUsers: () => any,
    filterName: (name: any) => any,
}

const UserList:FC<IUserList> = (props) => {
    const [users, setUsers] = useState<UserDetails[]>([]);
    const columns = 
        [{
            dataField: 'id',  
            text: 'Id'
        },
        {
        dataField: 'name',  
        text: 'Name'
        },
        {
        dataField: 'username',  
        text: 'Username'
        },
        {
        dataField: 'email',  
        text: 'Email'
        },
        {
        dataField: 'address.city',  
        text: 'City'
        },
        {
        dataField: 'phone',  
        text: 'Phone'
        },
        {
        dataField: 'website',  
        text: 'Website'
        },
        {
        dataField: 'company.name',  
        text: 'Company'
        },
    ];


store.subscribe(() => {
    setUsers(store.getState().filterStore.filteredUsers);
  });
   
  
    useEffect(() => {
        props.getUsers();
    }, [props]);
    
    const filterByInput = (e: any) => {
        let input = e.target.value;
        props.filterName(input);
    }

    return (
        <div>
            <div style={{ marginBottom: 20 }}>
                    <input onChange={e=> filterByInput(e)} style={{width: "50%"}} placeholder='Filter by Name' type='text'/>
            </div>
                {users &&  users.length && (<div className="container">  
                    <div className="row hdr">    
                    <div className="col-sm-12 btn btn-info">    
                        User List  
                    </div>    
                </div>  
                    <div  style={{ marginTop: 20 }}>  
                        <BootstrapTable 
                        striped  
                        hover  
                        keyField='id'   
                        data={ users }   
                        columns={ columns } >
                        </BootstrapTable>  
                    </div>  
                </div> 
                )}
            </div> 
    );
  }
  
  const mapStateToProps = (state: UserState) => {
    return {
        users: state.users,
        filteredUsers: state.filteredUsers,
    };
   };

  const mapDispatchToProps = (dispatch: any) => {
      return {
    filterName: (value: any) => dispatch(filterByName(value)),
    loadDate: (value: any) => dispatch(loadDate(value)),
    getUsers: () => dispatch(fetchUsers()),
      }
   };

 
 export default connect(mapStateToProps, mapDispatchToProps)(UserList);