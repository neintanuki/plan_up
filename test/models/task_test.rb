require "test_helper"

class TaskTest < ActiveSupport::TestCase
  test "should not save if name is empty" do
    category = create_user

    task = category.tasks.create(
      name: nil,
      body: "Body",
      is_completed: false,
      due_date: DateTime.new(2022, 2, 19, 8, 37)
    )

    assert_not task.save, "Saved the task without name"

  end

  test "should not save if name exceeds 40 characters" do
    category = create_user

    task = category.tasks.create(
      name: "This name is invalid because it's 40 characters long",
      body: "Body",
      is_completed: false,
      due_date: DateTime.new(2022, 2, 19, 8, 37)
    )

    assert_not task.save, "Saved the task with name exceeding 40 characters"
  end

  test "should not save if name begins with whitespace" do
    category = create_user

    task = category.tasks.create(
      name: "     Example Name",
      body: "Body",
      is_completed: false,
      due_date: DateTime.new(2022, 2, 19, 8, 37)
    )

    assert_not task.save, "Saved the task with name that begins on whitespace"
  end

  test "should not save if body begins with whitespace" do
    category = create_user

    task = category.tasks.create(
      name: "Example Name",
      body: "     Body",
      is_completed: false,
      due_date: DateTime.new(2022, 2, 19, 8, 37)
    )

    assert_not task.save, "Saved the task with body that begins on whitespace"
  end

  test "should not save task without due_date" do
    category = create_user

    task = category.tasks.create(
      name: "Example Name",
      body: "Body",
      is_completed: false,
      due_date: nil
    )

    assert_not task.save, "Saved the task without due_date"
  end

  test "should not save task without is_completed" do
    category = create_user

    task = category.tasks.create(
      name: "Example Name",
      body: "Body",
      is_completed: nil,
      due_date: DateTime.new(2022, 2, 19, 8, 37)
    )

    assert_not task.save, "Saved the task without is_completed"
  end

  private

  def create_user
    user = User.create(username: "Test", password: "12345678")
    project = user.projects.create(title: "Example")
    category = project.categories.create(title: "Test Category")

    return category
  end

  # test "the truth" do
  #   assert true
  # end
end
