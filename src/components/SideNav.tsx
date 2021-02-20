import * as React from "react";
import Nav from "react-bootstrap/Nav";

const SideNav = (props: { items: Array<{ title: string; path: string }> }) => {
  const { items } = props;

  return (
    <Nav defaultActiveKey="/home" className="flex-column">
      {items.map((item, index) => (
        <Nav.Link
          key={`link-${index}`}
          eventKey={`link-${index}`}
          href={item.path}
        >
          {item.title}
        </Nav.Link>
      ))}
    </Nav>
  );
};
export default SideNav;
