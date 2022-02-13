require "test_helper"

class ProjectControllerTest < ActionDispatch::IntegrationTest

  test 'should send create response' do
    create_user.save

    dummy_data = {
      title: "sample title",
      description: "sample description"
    }

    post_json '/api/v1/create/project', dummy_data
    assert_response :success

  end

  test 'should send create error response' do
    create_user.save

    dummy_data = {
      title: "  invalid sample title",
      description: "  invalid sample description"
    }

    post_json '/api/v1/create/project', dummy_data
    assert_response :bad_request
  end

  test 'should send new response' do
    user = create_user
    project = user.projects.create(
      title: "sample title",
      description: "sample description"      
    )
    project.save

    get '/api/v1/projects'

    assert_response :success
  end

  test 'should send edit response' do
    user = create_user
    project = user.projects.create(
      title: "sample title",
      description: "sample description"      
    )
    project.save

    dummy_data = {
      id: project.id,
      title: "edited title",
      description: "edited description"
    }

    patch '/api/v1/update/project', params: dummy_data.to_json
    assert_response :success
  end

  test 'should send edit error response' do
    user = create_user
    project = user.projects.create(
      title: "sample title",
      description: "sample description"      
    )
    project.save

    dummy_data = {
      id: project.id,
      title: "   edited title",
      description: "   edited description"
    }

    patch '/api/v1/update/project', params: dummy_data.to_json
    assert_response :bad_request
  end

  test 'delete user' do
    user = create_user
    project = user.projects.create(
      title: "sample title",
      description: "sample description"      
    )
    project.save

    dummy_data = {
      id: project.id
    }

    delete '/api/v1/destroy/project', params: dummy_data.to_json
    assert_response :success
  end

  # test "the truth" do
  #   assert true
  # end

  def create_user
    # create user
    user = User.create(
      username: "test_username",
      password: "passwordtest1234"
    )

    set_cookie(user.id)

    return user
  end

  def set_cookie(id)
    cookies["jwt_auth"] = JWT.encode(id, ENV["API_SALT"])
  end
end
