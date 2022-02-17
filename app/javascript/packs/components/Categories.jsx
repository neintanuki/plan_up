import React, { useState, useContext } from 'react'

import CategoryModal from './CategoryModal.jsx'
import DeleteModal from './DeleteModal.jsx'

import { create_category } from '../api/create'
import { edit_category } from '../api/edit'
import { delete_category } from '../api/delete'

import { ListContext } from '../pages/Dashboard'

export default function Categories() {
  const [category, setCategory] = useState({
    category_id: "",
    title: ""
  })
  const [edit, setEdit] = useState(false)
  const { list, selectedId } = useContext(ListContext)

  const [showModal, setShowModal] = useState(false)
  const handleClose = () => setShowModal(false)

  const [deleteModal, setDeleteModal] = useState(false)
  const closeDeleteModal = () => setDeleteModal(false)
  const showDeleteModal = () => setDeleteModal(true)

  function handleShow(isEdit) {
    setEdit(isEdit)
    setShowModal(true)
  }

  function createCategory() {
    create_category({ project_id: selectedId.project, title: category.title }).then(res => {
      console.log(res)
    })
  }

  function editCategory() {
    edit_category(category).then(res => {
      console.log(res)
    })
  }

  function handleEdit(id, title) {
    setCategory(() => {
      return {
        category_id: id,
        title
      }
    })

    handleShow(true)
  }

  function deleteCategory() {
    delete_category({ category_id: category.category_id }).then(res => {
      console.log(res)
    })
  }

  function handleDelete(category_id) {
    setCategory(state => {
      return {
        ...state,
        category_id
      }
    })

    showDeleteModal()
  }

  function handleSubmit() {
    if (edit) {
      editCategory()
    } else {
      createCategory()
    }
  }

  return (
    <div className="categories mb-2">
      <div className="header d-flex justify-content-between align-items-center">
        <h1 className="my-2 h5">Categories</h1>        
        <div className="btn-group">
          <button className="btn btn-success" onClick={() => handleShow(false)}>+</button>
        </div>
      </div>

      <div className="content">
        {
          list.categories.map(({ id, title }) => {
            return (
              <div className="category d-flex justify-content-between" key={id}>
                <span>{ title }</span>

                <div className="btn-group">
                  <button
                  className="btn-btn-success"
                  onClick={() => handleEdit(id, title)}
                  >edit</button>
                  <button className="btn btn-success" onClick={() => handleDelete(id)}>-</button>
                </div>
              </div>
            )
          })
        }
      </div>

      <CategoryModal show={showModal} handleClose={handleClose} handleSubmit={handleSubmit} category={category} setCategory={setCategory} edit={edit}/>

      <DeleteModal show={deleteModal} handleClose={closeDeleteModal} handleSubmit={deleteCategory} variant="Category" />
      
    </div>
  )
}