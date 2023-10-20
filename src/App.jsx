import { Button, Card, Empty, Flex, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { getInitialData } from './utils';

function App() {
  const charLeft = 50;
  const [notes, setNotes] = useState(getInitialData());
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const formSubmit = (e) => {
    e.preventDefault();
    setNotes([...notes, { id: notes.length + 1, title, body }]);
    setTitle('');
    setBody('');
  };

  return (
    <>
      <form onSubmit={formSubmit}>
        <Flex vertical gap="middle">
          <p>
            karakter Tersisa:{' '}
            <span style={{ color: charLeft - title.length <= 10 ? 'red' : '' }}>
              {charLeft - title.length}
            </span>
          </p>
          <Input
            placeholder="Judul"
            size="large"
            value={title}
            onChange={(e) => {
              if (e.target.value.length > charLeft) return;
              setTitle(e.target.value);
            }}
          />
          <TextArea
            rows={4}
            onChange={(e) => setBody(e.target.value)}
            value={body}
          />
          <Button type="primary" htmlType="submit">
            Simpan
          </Button>
        </Flex>
      </form>
      {notes ? (
        notes.map((note) => (
          <Card key={note.id} title={note.title} bordered>
            {note.body}
          </Card>
        ))
      ) : (
        <Empty />
      )}
    </>
  );
}

export default App;
