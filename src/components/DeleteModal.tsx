import { FiTrash } from 'react-icons/fi';
import Modal from 'react-modal';
import { api } from '../services/api';

type DeleteModalProps = {
  type: 'experiences' | 'tags' | 'projects';
  isOpen: boolean;
  onRequestClose: () => void;
  dataId: string;
}

export function DeleteModal({ type, isOpen, onRequestClose, dataId }: DeleteModalProps) {
  async function handleDelete() {
    switch (type) {
      case 'tags':
        try {
          await api.delete(`/tags/delete/${dataId}`);
        } catch (err) {
          console.log(err);
        } finally {
          onRequestClose();
        }

        break;
      case 'projects':
        try {
          await api.delete(`/projects/delete/${dataId}`);
        } catch (err) {
          console.log(err);
        } finally {
          onRequestClose();
        }

        break;
      case 'experiences':
        try {
          await api.delete(`/experiences/delete/${dataId}`);
        } catch (err) {
          console.log(err);
        } finally {
          onRequestClose();
        }

        break;
      default:
        break;
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <div className="flex flex-col items-center justify-center gap-8 p-4 bg-gray-100 rounded w-96 h-96">
        <h2 className="text-xl text-gray-800">Deseja excluir {type === 'tags' ? 'essa tag' : type === 'projects' ? 'esse projeto' : 'essa experiência'}?</h2>
        <FiTrash className="w-32 h-32 text-gray-800" />
        <div className="flex items-center justify-center w-full gap-4 px-6">
          <button
            className="flex-1 py-4 text-white duration-100 bg-red-500 rounded hover:bg-red-600 "
            onClick={onRequestClose}
          >
            Não
          </button>
          <button
            className="flex-1 py-4 text-white duration-100 bg-blue-500 rounded hover:bg-blue-600"
            onClick={handleDelete}
          >
            Sim
          </button>
        </div>
      </div>
    </Modal>
  )
}