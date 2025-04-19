// src/pages/MemoryPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  fetchMemories,
  fetchRandomMemory,
  createMemory,
  updateMemory,
  deleteMemory
} from '../api';
import MemoryCard from '../components/MemoryCard';
import MemoryFormModal from '../components/MemoryFormModal';
import './MemoryPage.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  if (startPage > 1) {
    pageNumbers.push(1);
    if (startPage > 2) {
      pageNumbers.push('prev-ellipsis');
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pageNumbers.push('next-ellipsis');
    }
    pageNumbers.push(totalPages);
  }

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
        «
      </button>
      {pageNumbers.map((num, idx) =>
        typeof num === 'number' ? (
          <button
            key={idx}
            className={`page-button ${currentPage === num ? 'active' : ''}`}
            onClick={() => onPageChange(num)}
          >
            {num}
          </button>
        ) : (
          <span key={idx} className="ellipsis">...</span>
        )
      )}
      <button onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>
        »
      </button>
    </div>
  );
}

function MemoryPage() {
  const [memories, setMemories] = useState([]);
  const [randomMemory, setRandomMemory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingMemory, setEditingMemory] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const memoriesPerPage = 10;

  const loadMemories = useCallback(async () => {
    const skip = (currentPage - 1) * memoriesPerPage;
    const res = await fetchMemories(memoriesPerPage, skip);
    setMemories(res.data.memories);
    setTotalCount(res.data.total);
  }, [currentPage, memoriesPerPage]);

  const loadRandomMemory = async () => {
    const res = await fetchRandomMemory();
    setRandomMemory(res.data.memory);
  };

  const handleCreateOrUpdate = async (data) => {
    if (editingMemory) {
      await updateMemory(editingMemory._id, data);
    } else {
      await createMemory(data);
    }
    setShowModal(false);
    setEditingMemory(null);
    loadMemories();
  };

  const handleDelete = async (id) => {
    if (window.confirm('정말 삭제할까요?')) {
      await deleteMemory(id);
      loadMemories();
    }
  };

  useEffect(() => {
    loadMemories();
  }, [loadMemories]);

  useEffect(() => {
    loadRandomMemory();
  }, []);
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  
    return () => {
      document.body.style.overflow = 'auto'; // 혹시 언마운트 돼도 복구
    };
  }, [showModal]);

  return (
    <div className="memory-page">
      <h2 className="memory-title">🌟 추억 페이지</h2>

      <button className="add-memory-btn" onClick={() => setShowModal(true)}>
        ➕ 추억 작성하기
      </button>

      {randomMemory && (
        <MemoryCard memory={randomMemory} isRandom={true} />
      )}

      {memories.map((memory) => (
        <MemoryCard
          key={memory._id}
          memory={memory}
          onEdit={(m) => {
            setEditingMemory(m);
            setShowModal(true);
          }}
          onDelete={handleDelete}
        />
      ))}

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalCount / memoriesPerPage)}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {showModal && (
        <MemoryFormModal
          onClose={() => {
            setShowModal(false);
            setEditingMemory(null);
          }}
          onSubmit={handleCreateOrUpdate}
          defaultData={editingMemory}
        />
      )}
    </div>
  );
}

export default MemoryPage;
