require "test_helper"

class CategoryControllerTest < ActionDispatch::IntegrationTest

  # create 
  test "should send create response" do
    project = create_user_with_project

    dummy_data = {
      project_id: project.id,
      title: "Sample Title"
    }

    post_json '/api/v1/create/category', dummy_data
    assert_response :success
  end

  test "should send create error response" do
    create_user_with_project

    dummy_data = {
      title: "sample title" # no project_id
    }

    post_json '/api/v1/create/category', dummy_data
    assert_response :bad_request
  end

  # new
  test "should send new response" do
    project = create_user_with_project
    create_category project

    get "/api/v1/categories/#{{project.id}}"
    assert_response :success
  end

  # edit
  test "should send edit response" do

  end

  test "should send edit error response" do

  end

  # delete
  test "shoulde send delete response" do

  end

  private

  def create_user_with_project
    user = User.create(
      username: "test_username",
      password: "test_password"
    )

    set_cookie user.id
    return create_project user
  end

  def create_project user
    project = user.projects.create(
      title: "Sample Title"
    )

    project.save
    return project
  end

  def create_category(project, is_success = true)
    if is_success
      category = project.categories.create(
        project_id: project.id,
        title: "Sample Category"
      )

      category.save
    else
      category = project.categories.create(
        title: "Sample Category" # no project_id
      )

      category.save
    end
  end

  def set_cookie id
    cookies["jwt_auth"] = JWT.encode(id, ENV['API_SALT'])
  end

  # test "the truth" do
  #   assert true
  # end
end
