# React Lumen Job Board — Architecture

Tech stack: React 17 · React Router DOM v5 · Semantic UI React · Laravel Lumen · MySQL

---

## Application Flow Chart

```mermaid
flowchart TD
    Entry([index.js\nReactDOM.render]) --> App["App.js\nBrowserRouter + Switch\nPersistent Navbar"]

    App -->|"/"| Redirect["\u2192 /board redirect"]
    Redirect --> Board
    App -->|"/home"| Home["Home.js\nStatic landing page"]
    App -->|"/board"| Board["Board.js\nJob listings table\n+ inline JobForm"]
    App -->|"/job/:id"| Job["Job.js\nSingle job detail\nreads :id via useParams()"]

    Board -->|"useEffect[]"| FetchAll["fetch GET /api/jobs/\non mount (once)"]
    FetchAll -->|"200 jobs[]"| SetJobs["setJobs(jobsList)\nlocal React state"]
    SetJobs --> RenderTable["Render job rows\n+ ViewJobButton + DeleteJobButton"]

    RenderTable --> JobForm["JobForm.js\nControlled form\nHandles POST"]
    JobForm -->|"POST /api/jobs/"| API[(Lumen API\nMySQL)]
    API -->|"201 new job"| OnAddition["onAddition(job)\nBoard appends to state"]

    RenderTable --> DeleteBtn["DeleteJobButton\nDELETE /api/jobs/:id"]
    DeleteBtn -->|"200 OK"| OnDelete["onDelete(id)\nBoard filters state"]

    Job -->|"useEffect[id]"| FetchOne["fetch GET /api/jobs/:id"]
    FetchOne -->|"200 job{}"| SetJob["setJob(data)\nRender detail table"]
```

---

## Data Model

```mermaid
classDiagram
    class Job {
        +id: int (auto-increment)
        +title: string (max 255)
        +description: string
        +location: string (max 255)
        +created_at: timestamp
        +updated_at: timestamp
    }

    class BoardState {
        +jobs: Job[] | undefined
        +isLoading: boolean
        +error: string | null
    }

    class JobFormState {
        +title: string
        +description: string
        +location: string
        +isLoading: boolean
        +error: boolean
        +errorMessage: string
    }

    class JobDetailState {
        +job: Job | null
        +isLoading: boolean
    }

    BoardState "1" o-- "many" Job
```

---

## API Endpoints (Lumen Backend)

```mermaid
flowchart LR
    subgraph "READ"
        G1[GET /api/jobs/] --> idx[JobController@index\nReturn all jobs]
        G2[GET /api/jobs/:id] --> show[JobController@show\nReturn one job]
    end
    subgraph "WRITE"
        P1[POST /api/jobs/] --> create[JobController@create\nValidate + INSERT\nReturns 201]
        U1["PUT|PATCH /api/jobs/:id"] --> update[JobController@update\nPartial update\nReturns 200]
        D1[DELETE /api/jobs/:id] --> del[JobController@delete\nHard delete\nReturns 204]
    end
```

---

## Component Interaction Flow

```mermaid
sequenceDiagram
    participant User
    participant Board
    participant JobForm
    participant API as Lumen REST API
    participant Job as Job detail page

    Note over User,Job: Load board
    User->>Board: navigate to /board
    Board->>API: GET /api/jobs/
    API-->>Board: 200 [ { id, title, ... } ]
    Board-->>User: renders job table rows

    Note over User,Job: Add a job
    User->>JobForm: fills title/desc/location + submit
    JobForm->>API: POST /api/jobs/ { title, description, location }
    API-->>JobForm: 201 { id, title, ... }
    JobForm->>Board: onAddition(newJob)
    Board-->>User: appends row (no re-fetch)

    Note over User,Job: View job detail
    User->>Board: click job title link → /job/42
    Board->>Job: React Router renders Job component
    Job->>API: GET /api/jobs/42
    API-->>Job: 200 { id, title, description, location }
    Job-->>User: renders detail table

    Note over User,Job: Delete a job
    User->>Board: clicks DeleteJobButton (id=42)
    Board->>API: DELETE /api/jobs/42
    API-->>Board: 200 OK
    Board-->>User: onDelete(42) — filters row from state
```
