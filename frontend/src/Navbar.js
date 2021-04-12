import React, { Component } from 'react';

import { Container, Menu } from 'semantic-ui-react';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return (
            <div>
                <Menu fixed="top" inverted>
                    <Container>
                        <Menu.Item as="a" header href="/board">
                            Job Board
                        </Menu.Item>
                    </Container>
                </Menu>
            </div>
        );
    }
};
