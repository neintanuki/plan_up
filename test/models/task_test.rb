require "test_helper"

class TaskTest < ActiveSupport::TestCase
  test "should not save if name is empty" do
    category = create_user



    # puts category.save

    # assert_not task.save, "Task name is saved"
  end

  # test "should not save if name exceeds to 40 characters" do
  #   category = create_user

  #   task = category.tasks.create(
  #     name: "Ters long",
  #     body: "Sample Body",
  #     is_completed: false
  #   )

  #   # puts task.save
  #   assert_not task.save, "Saved task name that exceeds 40 characters"
  # end

  test "should not save if name begins in whitespace" do

  end

  test "should not save if body begins in whitespace" do

  end

  test "should not save if is_completed is empty" do

  end

  private
  def create_user
    user = User.create(
      username: "test_username",
      password: "test_password"
    )

    project = user.projects.create(
      title: "Sample Title"
    )

    category = project.categories.create(
      title: "Sample Category"
    )

    task = category.tasks.create(
      name: "sample",
      body: "sample",
      is_completed: false
    )

    puts user.save

    # return create_project(user)
  end

  # def create_project user
  #   project = user.projects.create(
  #     title: "Sample Title"
  #   )
  #   return create_category(project)
  # end

  # def create_category project
  #   category = project.categories.create(
  #     title: "Sample Category"
  #   )

  #   task = category.tasks.create(
  #     name: "sample",
  #     body: "sample",
  #     is_completed: false
  #   )

  #   return category
  # end

  # test "the truth" do
  #   assert true
  # end
end
