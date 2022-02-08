require "test_helper"

class UserTest < ActiveSupport::TestCase
  # without username
  test "should not save without username" do
    user = User.create(
      password: "passwordtest"
    )

    assert_not user.save, "Saved the user without username"
  end

  # username is whitespace
  test "should not save username with only whitespace" do
    user = User.create(
      username: " ",
      password: "passwordtest"
    )

    assert_not user.save, "Saved the user with ONLY whitespace"
  end

  # username has whitespace in the string
  test "should not save username with whitespace" do
    user = User.create(
      username: "test username with whitespace",
      password: "passwordtest"
    )

    assert_not user.save, "Saved the user with whitespace"
  end

  # is unique
  test "should not save username if not unique" do
    user_1 = User.create(
      username: "unique_user",
      password: "passwordtest"
    )

    user_2 = User.create(
      username: "unique_user",
      password: "passwordtest"
    )

    user_1.save

    assert_not user_2.save, "Saved the user that has duplicate username"
  end

  # not exceeds to 16 char
  test "should not save username that exceeds to 16 characters" do
    user = User.create(
      username: "this_username_is_over_16_characters",
      password: "passwordtest"
    )

    assert_not user.save, "Saved the username that exceeds over 16 characters"
  end

  # wihtout password
  test "should not save user without password" do
    user = User.create(
      username: "test",
    )

    assert_not user.save, "Saved the user without password"
  end

  # minimum of 6 char
  test "should not save password below 6 characters in length" do
    user = User.create(
      username: "test",
      password: "abc"
    )

    assert_not user.save, "Saved the password below 6 characters in length"
  end


  # test "the truth" do
  #   assert true
  # end
end
