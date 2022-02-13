require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  test "should not save if title is blank" do
    assert_not create_category(nil), "saved title without value"
  end

  test "should not save if title begins with whitespace" do
    assert_not create_category("  begins in whitespace"), "saved title that begins in whitespace"
  end

  test "shoulde not save if title exceeds to 40 characters" do
    assert_not create_category("this is a title that has over 40 characters"),
    "saved title that exceeds to 40 characters"
  end

  private

  def create_user
    user = User.create(
      username: "test_username",
      password: "test_password"
    )

    return create_project(user)
  end

  def create_project user
    project = user.projects.create(
      title: "Sample Project"
    )

    return project
  end

  def create_category title
    user = create_user
    category = user.categories.create(title: title)

    return category.save
  end
  # test "the truth" do
  #   assert true
  # end
end
