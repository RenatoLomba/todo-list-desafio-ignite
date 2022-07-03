import { ClipboardText, PlusCircle } from 'phosphor-react';
import { FormEvent, useState } from 'react';

import './styles/global.scss';

import { Header } from './components/header';
import { ToDo } from './components/todo';
import styles from './styles/app.module.scss';

interface IToDo {
  id: string;
  description: string;
  isDone: boolean;
}

function App() {
  const [toDos, setToDos] = useState<IToDo[]>([]);
  const [newToDoText, setNewToDoText] = useState('');

  const isNewToDoTextEmpty = !newToDoText.trim();
  const toDosCount = toDos.length;
  const toDosDoneCount = toDos.filter((toDo) => toDo.isDone).length;

  const handleCreateNewToDoSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (isNewToDoTextEmpty) return;

    setToDos((prev) => [
      {
        description: newToDoText,
        isDone: false,
        id: new Date().getTime().toString(),
      },
      ...prev,
    ]);
    setNewToDoText('');
  };

  const handleCompleteToDo = (toDoId: string) => {
    setToDos((prev) =>
      [...prev].map((toDo) => {
        if (toDo.id === toDoId) {
          return { ...toDo, isDone: true };
        }

        return toDo;
      }),
    );
  };

  const handleRemoveToDo = (toDoId: string) => {
    setToDos((prev) => [...prev].filter((toDo) => toDo.id !== toDoId));
  };

  return (
    <div>
      <Header />

      <main className={styles.mainContainer}>
        <form onSubmit={handleCreateNewToDoSubmit}>
          <input
            value={newToDoText}
            onChange={(e) => setNewToDoText(e.target.value)}
            type="text"
            placeholder="Adicione uma nova tarefa"
            required
          />

          <button disabled={isNewToDoTextEmpty} type="submit">
            Criar <PlusCircle size={16} />
          </button>
        </form>

        <div className={styles.toDosContainer}>
          <div className={styles.toDosHeader}>
            <div>
              <strong>Tarefas criadas</strong>
              <span className={styles.counter}>{toDosCount}</span>
            </div>

            <div>
              <strong>Concluídas</strong>
              <span className={styles.counter}>
                {toDosDoneCount} de {toDosCount}
              </span>
            </div>
          </div>

          {toDos.length === 0 ? (
            <div className={styles.emptyToDosContainer}>
              <ClipboardText size={56} />

              <p>
                <strong>Você ainda não tem tarefas cadastradas</strong> <br />
                <span>Crie tarefas e organize seus itens a fazer</span>
              </p>
            </div>
          ) : (
            <div className={styles.toDosList}>
              {toDos.map((toDo) => (
                <ToDo
                  key={toDo.id}
                  isDone={toDo.isDone}
                  description={toDo.description}
                  onToDoCheck={() => handleCompleteToDo(toDo.id)}
                  onDeleteButtonClick={() => handleRemoveToDo(toDo.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
