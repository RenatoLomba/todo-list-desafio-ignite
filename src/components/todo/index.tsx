import classNames from 'classnames';
import { Trash } from 'phosphor-react';
import { FC } from 'react';

import styles from './todo.module.scss';

interface IToDoProps {
  description: string;
  isDone: boolean;
  onToDoCheck: () => void;
  onDeleteButtonClick: () => void;
}

export const ToDo: FC<IToDoProps> = ({
  description,
  isDone,
  onToDoCheck,
  onDeleteButtonClick,
}) => {
  return (
    <div
      className={classNames(styles.toDo, {
        [styles.done]: isDone,
      })}
    >
      <input
        disabled={isDone}
        onChange={onToDoCheck}
        checked={isDone}
        type="checkbox"
      />

      <p>{description}</p>

      <button onClick={onDeleteButtonClick}>
        <Trash size={14} />
      </button>
    </div>
  );
};
