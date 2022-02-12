require "test_helper"

class ProjectTest < ActiveSupport::TestCase

  test "should not save if title is empty" do
    user = User.create(
      username: "test_username",
      password: "12345password"
    )

    project = user.projects.create(
      title: nil
    )

    assert_not project.save, "Title should not be saved if it's empty"
  end

  test "should not save if title begins with a whitespace character" do
    user = User.create(
      username: "test_username",
      password: "12345password"
    )

    project = user.projects.create(
      title: "  begins in whitespace"
    )

    assert_not project.save, "Title should not be saved if it begins with a whitespace"
  end

  test "should not save title if it exceeds 40 characters" do
    user = User.create(
      username: "test_username",
      password: "12345password"
    )

    project = user.projects.create(
      title: "This is a very long title because it needs to exceed 40 characters in length"
    )

    assert_not project.save, "Title should not be saved if it's 40 characters long"

  end

  test "should not save if description begins with a whitespace character" do
    user = User.create(
      username: "test_username",
      password: "12345password"
    )

    project = user.projects.create(
      title: "Sample Title",
      description: "   begins in whitespace"
    )

    assert_not project.save, "Description should not be saved if it begins with a whitespace"
  end

  # test "the truth" do
  #   assert true
  # end
end
