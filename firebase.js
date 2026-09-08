rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function role() {
      return get(/databases/$(database)/documents/cc_users/$(request.auth.uid)).data.role;
    }
    function isAdmin()   { return request.auth != null && role() == 'admin'; }
    function isManager() { return request.auth != null && (role() == 'manager' || role() == 'admin'); }

    match /cc_users/{uid} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && (request.auth.uid == uid || isAdmin());
      allow update: if isAdmin() || (isManager() && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['rendement']));
      allow delete: if isAdmin();
    }

    match /cc_blocks/{id} {
      allow read: if request.auth != null && (resource.data.owner == request.auth.uid || isManager());
      allow create: if request.auth != null && (request.resource.data.owner == request.auth.uid || isAdmin());
      allow update, delete: if request.auth != null && (resource.data.owner == request.auth.uid || isAdmin());
    }

    match /cc_projects/{id} {
      allow read: if request.auth != null;
      allow write: if isManager();
    }

    match /cc_config/{doc} {
      allow read: if request.auth != null;
      allow write: if isAdmin();
    }
    match /cc_refs/{doc} {
      allow read: if request.auth != null;
      allow write: if isAdmin();
    }

    match /{document=**} {
      allow read, write: if false;
    }
  }
}
