import { Button, Flex, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useReducer } from 'react';

const initialState = {
  title: '',
  body: '',
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'set':
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case 'empty':
      return {
        title: '',
        body: '',
      };
  }
};

export default function NoteForm({ onSubmit }) {
  const MAX_CHAR = 50;
  const [form, dispatch] = useReducer(formReducer, initialState);
  const formSubmit = (e) => {
    e.preventDefault();
    onSubmit((notes) => [
      ...notes,
      {
        id: +new Date(),
        createdAt: new Date(),
        title: form.title,
        body: form.body,
        archived: false,
      },
    ]);
    dispatch({ type: 'empty' });
  };
  return (
    <form onSubmit={formSubmit}>
      <Flex vertical gap="middle">
        <p>
          Karakter Tersisa:{' '}
          <span
            style={{ color: MAX_CHAR - form.title.length <= 10 ? 'red' : '' }}
          >
            {MAX_CHAR - form.title.length}
          </span>
        </p>
        <Input
          placeholder="Judul"
          size="large"
          value={form.title}
          name="title"
          onChange={(e) => {
            if (e.target.value.length > MAX_CHAR) return;
            dispatch({
              type: 'set',
              payload: { name: e.target.name, value: e.target.value },
            });
          }}
          required
        />
        <TextArea
          rows={4}
          name="body"
          onChange={(e) =>
            dispatch({
              type: 'set',
              payload: { name: e.target.name, value: e.target.value },
            })
          }
          value={form.body}
          placeholder="Catatan"
          required
        />
        <Button type="primary" htmlType="submit">
          Simpan
        </Button>
      </Flex>
    </form>
  );
}
