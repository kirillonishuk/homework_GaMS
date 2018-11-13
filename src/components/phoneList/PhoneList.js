import React, { Component, Fragment } from 'react';
import './phone.css';
import AuthContext from '../../context/LogginContext';
import saveAs from 'file-saver';
import ModalConfirm from '../modalConfirm/modal';

class PhoneList extends Component {
    static contextType = AuthContext;

    state = {
        name: '',
        adress: '',
        list: [],
        isSelect: null,
        showConfirmModal: false,
        textConfirmModal: '',
        onOKConfirmModal: () => { console.log(1) },
        onCANCELConfirmModal: () => { this.setState({ showConfirmModal: false }) },
        searchField: ''
    };

    loadList = (event) => {
        event.preventDefault();
        this.loader.click();
    }

    loadInfo = (event) => {
        event.preventDefault();
        let reader = new FileReader();
        reader.onload = () => {
            let list = atob(reader.result.split(',')[1]);
            list = list.split(';\n');
            list[list.length - 1] = list[list.length - 1].slice(0, -1);
            const adressList = [];
            list.forEach(adress => {
                adress = adress.split(' - ');
                adressList.push({ name: adress[0], adress: adress[1] })
            });
            if (list.length)
                this.setState({
                    list: adressList
                }, () => this.setState({
                    name: this.state.list[0].name,
                    adress: this.state.list[0].adress,
                    isSelect: 0
                }))
        };
        reader.readAsDataURL(event.target.files[0]);
    }

    saveFile = (event) => {
        event.preventDefault();
        let list = '';
        for (let key in this.state.list) {
            list += this.state.list[key].name + ' - ' + this.state.list[key].adress + ';\n';
        };
        const filename = 'lib.txt';
        const file = new File([list], filename, { type: 'text/plain' });
        saveAs(file)
    }

    changeName = (event) => {
        this.setState({
            name: event.target.value
        });
    }

    changeAdress = (event) => {
        this.setState({
            adress: event.target.value
        });
    }

    addAdress = (event) => {
        event.preventDefault();
        if (this.state.name && this.state.adress)
            this.setState(prevState => ({
                list:
                    prevState.list.concat({ name: this.state.name, adress: this.state.adress }),
                isSelect:
                    prevState.list.length,
                showConfirmModal:
                    false
            }));
    }

    onAddAdress = (event) => {
        event.preventDefault();
        if (this.state.showConfirmModal) return;
        if (this.state.name && this.state.adress) {
            this.setState({
                textConfirmModal: <span>You want to add user <b>{this.state.name}</b> in address book?</span>,
                onOKConfirmModal: this.addAdress
            }, () => {
                this.setState({
                    showConfirmModal: true
                })
            });
        }
    }

    editAdress = (event) => {
        event.preventDefault();
        let list = this.state.list;
        list[this.state.isSelect] = { name: this.state.name, adress: this.state.adress };
        this.setState({
            list: [...list]
        });
    }

    onRemoveAdress = (event) => {
        event.preventDefault();
        if (!this.state.list.length) return;
        if (this.state.showConfirmModal) return;
        this.setState({
            textConfirmModal: <span>You want to delete user <b>{this.state.name}</b> from address book?</span>,
            onOKConfirmModal: this.removeAdress
        }, () => {
            this.setState({
                showConfirmModal: true
            })
        });
    }

    removeAdress = (event) => {
        event.preventDefault();
        if (!this.state.list.length) {
            this.setState({
                showConfirmModal: false
            })
            return;
        }
        if (this.state.list.length === 1) {
            this.setState({
                list: [],
                isSelect: null,
                name: '',
                adress: '',
                showConfirmModal: false
            });
        } else {
            event.preventDefault();
            let step = -1;
            let list = [...this.state.list];
            let isSelect = this.state.isSelect;
            if (!isSelect) step = 1;
            list.splice(isSelect, 1);

            this.setState({
                list: [...list],
                isSelect: isSelect,
                name: this.state.list[isSelect + step].name,
                adress: this.state.list[isSelect + step].adress,
                showConfirmModal: false
            });
        };
    }

    onNavigation = (event, step) => {
        event.preventDefault();
        if ((this.state.isSelect === 0 && step === -1) ||
            (this.state.isSelect === null && step === -1) ||
            (this.state.isSelect === this.state.list.length - 1 && step === 1) ||
            (this.state.isSelect === null && step === 1))
            return;
        this.setState(prevState => ({
            name:
                prevState.list[prevState.isSelect + step].name,
            adress:
                prevState.list[prevState.isSelect + step].adress,
            isSelect:
                prevState.isSelect + step
        }))
    }

    changeSearchField = (event) => {
        this.setState({
            searchField: event.target.value
        });
    }

    onSearchUser = (event) => {
        event.preventDefault();
        if (this.state.showConfirmModal) return;
        this.setState({
            textConfirmModal: <Fragment>
                <span>{`Enter Name:  `}</span>
                <input type="text" onChange={this.changeSearchField} />
            </Fragment>,
            onOKConfirmModal: this.searchUser
        }, () => {
            this.setState({
                showConfirmModal: true
            })
        });
    }

    searchUser = (event) => {
        let isFound = false;
        for (let i = 0; i < this.state.list.length; i++) {
            if (this.state.list[i].name
                .toLocaleLowerCase()
                .indexOf(this.state.searchField.toLocaleLowerCase()) !== -1) {
                isFound = true;
                this.setState({
                    name: this.state.list[i].name,
                    adress: this.state.list[i].adress,
                    isSelect: i,
                    showConfirmModal: false
                });
                break;
            }
        }
        if (!isFound) {
            this.setState({
                name: '',
                adress: '',
                isSelect: null,
                showConfirmModal: false
            })
        };
    }

    editAdress = (event) => {
        event.preventDefault();
        let list = this.state.list;
        list[this.state.isSelect] = { name: this.state.name, adress: this.state.adress };
        this.setState({
            list: [...list]
        });
    }

    render() {


        return (
            <Fragment>
                {this.context.isAuth ?
                    <div>
                        <ModalConfirm
                            isVisible={this.state.showConfirmModal}
                            text={this.state.textConfirmModal}
                            onOKClick={this.state.onOKConfirmModal}
                            onCANCELClick={this.state.onCANCELConfirmModal}
                        />
                        <label htmlFor="phone-input-name" className="phone-label">Name: </label>
                        <input type="text" id="phone-input-name" value={this.state.name} onChange={this.changeName} /><br />
                        <label htmlFor="phone-input-adress" id="phone-label-textarea" className="phone-label">Adress: </label>
                        <textarea id="phone-input-adress" value={this.state.adress} onChange={this.changeAdress} />
                        <div className="phone-nav-button-container">
                            <button onClick={(event => this.onNavigation(event, -1))} className="phone-nav-button">Prev</button>
                            <div className="nav-number">{this.state.isSelect === 0 || this.state.isSelect ? this.state.isSelect + 1 : null}</div>
                            <button onClick={(event => this.onNavigation(event, 1))} className="phone-nav-button">Next</button>
                        </div>
                        <div className="phone-menu-button-container">
                            <button onClick={this.onAddAdress}>Add</button>
                            <button onClick={this.editAdress}>Edit</button>
                            <button onClick={this.onRemoveAdress}>Remove</button>
                            <button onClick={this.onSearchUser}>Find</button>
                            <button onClick={this.loadList}>Load...</button>
                            <input
                                type="file"
                                accept=".txt, .json"
                                placeholder="Load..."
                                ref={ref => this.loader = ref}
                                onChange={this.loadInfo}
                            />
                            <button onClick={this.saveFile}>Save...</button>
                        </div>
                    </div> : null}
            </Fragment>
        );
    }
}

export default PhoneList;
