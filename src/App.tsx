import { useEffect, useState } from "react";
import "./App.scss";
import {
  Card,
  Col,
  Container,
  Image,
  Row,
  Stack,
  ThemeProvider,
} from "react-bootstrap";
import { fetchItems } from "./ApiService";

function App() {
  const [currentPath, setCurrentPath] = useState(["/"]);
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      const params = currentPath.join("/");

      const fetched = await fetchItems(params);
      setItems(fetched);
    }
    fetchData();
  }, [currentPath]);

  function onBackFolder() {
    const myPaths = [...currentPath];
    myPaths.pop();
    setCurrentPath(myPaths);
  }

  function openFolder(folderName: string) {
    const myPaths = [...currentPath];
    myPaths.push(folderName);
    setCurrentPath(myPaths);
  }

  return (
    <ThemeProvider>
      <Card>
        <Card.Header>
          {currentPath.length > 1 && (
            <div onClick={() => onBackFolder()}>
              <Image
                src="/back-btn-icon.png"
                alt="back button"
                roundedCircle
                className="back-icon"
              />
            </div>
          )}
          File Explorer
        </Card.Header>
        <Card.Body>
          <Container>
            <Row>
              <Col md={12}>
                <Stack gap={4} direction="horizontal">
                  {items.map((item, key) => (
                    <div key={key}>
                      {item.includes(".") ? (
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                          <Image
                            src="/file-icon.png"
                            alt="folder icon"
                            thumbnail
                            className="item-icon"
                          />
                          {item}
                        </div>
                      ) : (
                        <div
                          style={{display: 'flex', flexDirection: 'column'}}
                          onDoubleClick={() => {
                            openFolder(item);
                          }}
                        >
                          <Image
                            src="/folder-icon.png"
                            alt="folder icon"
                            thumbnail
                            className="item-icon"
                          />
                          {item}
                        </div>
                      )}
                    </div>
                  ))}
                </Stack>
              </Col>
            </Row>
          </Container>
        </Card.Body>
        <Card.Footer>
          Note: Double click to open folder 
        </Card.Footer>
      </Card>
    </ThemeProvider>
  );
}

export default App;
