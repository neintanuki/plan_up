import React, { useState, useContext } from 'react'

import CategoryModal from './CategoryModal.jsx'
import DeleteModal from './DeleteModal.jsx'

import { get_categories } from '../api/read'
import { create_category } from '../api/create'
import { edit_category } from '../api/edit'
import { delete_category } from '../api/delete'

import { ListContext } from '../pages/Dashboard'

import edit_icon from 'images/edit.svg'
import add from 'images/plus-square.svg'
import remove from 'images/x-square.svg'

export default function Categories() {
  const [category, setCategory] = useState({
    category_id: "",
    title: ""
  })
  const [edit, setEdit] = useState(false)
  const { list, selectedId, setList } = useContext(ListContext)

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
      console.log(selectedId.project)
      get_categories(selectedId.project).then(res => {
        const { data } = res.data
        console.log(res)
        setList(state => {
          return {
            ...state,
            categories: data
          }
        })
      })
    })
  }

  function editCategory() {
    edit_category({...category, project_id: selectedId.project}).then(res => {
      console.log(res)
      get_categories(selectedId.project).then(res => {
        const { data } = res.data
        console.log(res)
        setList(state => {
          return {
            ...state,
            categories: data
          }
        })
      })
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
    delete_category({ category_id: category.category_id, project_id: selectedId.project }).then(res => {
      console.log(res)
      get_categories(selectedId.project).then(res => {
        const { data } = res.data
        console.log(res)
        setList(state => {
          return {
            ...state,
            categories: data
          }
        })
      })
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
    <div className="categories mb-2 px-4 py-2 line-bottom">
      <div className="header d-flex justify-content-between align-items-center">
        <h1 className="my-2 h5">Categories</h1>        
        <div className="btn-group">
          <button className="icon" onClick={() => handleShow(false)}><img src={add} alt="add" /></button>
        </div>
      </div>

      <div className="content">
        {
          list.categories.map(({ id, title }) => {
            return (
              <div className="category my-1 d-flex justify-content-between" key={id}>
                <span>{ title }</span>

                <div className="btn-group">
                  <button
                  className="icon"
                  onClick={() => handleEdit(id, title)}
                  ><img src={edit_icon} alt="edit" /></button>
                  <button className="icon" onClick={() => handleDelete(id)}><img src={remove} alt="remove" /></button>
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