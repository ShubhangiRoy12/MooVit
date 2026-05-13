from app.model.user import User

class UserRepository:
    def __init__(self):
        # Hardcoded user for demo
        self.users = [
            User(email="user@example.com", password="Password123!")
        ]

    def authenticate(self, email: str, password: str) -> bool:
        for user in self.users:
            if user.email == email and user.password == password:
                return True
        return False