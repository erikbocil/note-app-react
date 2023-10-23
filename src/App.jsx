import { Col, Input, Row } from 'antd';
import { useState } from 'react';
import { getInitialData } from './utils';
import { CloseOutlined } from '@ant-design/icons';
import NoteForm from './Components/NoteForm';
import { Content } from 'antd/es/layout/layout';
import NoteList from './Components/NoteList';

function App() {
  const [notes, setNotes] = useState(getInitialData());
  const [query, setQuery] = useState('');

  const handleArchive = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, archived: !note.archived } : note,
      ),
    );
  };

  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <>
      <Content style={{ padding: '0 1rem' }}>
        <Row justify="center">
          <Col xs={24} md={12}>
            <NoteForm onSubmit={setNotes} />
          </Col>
        </Row>

        <br />

        <Row justify="end">
          <Col>
            <Input
              placeholder="Cari Catatan"
              size="large"
              value={query}
              name="title"
              onChange={(e) => setQuery(e.target.value)}
              suffix={<CloseOutlined onClick={() => setQuery('')} />}
            />
          </Col>
        </Row>

        <NoteList
          notes={notes}
          handleArchive={handleArchive}
          handleDelete={handleDelete}
          query={query}
          archived={false}
        />

        <NoteList
          notes={notes}
          handleArchive={handleArchive}
          handleDelete={handleDelete}
          query={query}
          archived={true}
        />
      </Content>
    </>
  );
}

export default App;
