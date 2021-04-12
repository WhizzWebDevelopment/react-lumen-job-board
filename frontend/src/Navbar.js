import React from 'react';
import { Container, Menu } from 'semantic-ui-react';

export default function Navbar() {
    return (
        <Menu fixed="top" inverted>
            <Container>
                <Menu.Item as="a" header href="/board">
                    Job Board
                </Menu.Item>
            </Container>
        </Menu>
    );
}
