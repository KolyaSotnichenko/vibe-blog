// Auto-generated from OpenAPI spec. Do not edit manually.

export interface HealthResponse {
  status: string;
}

export interface Paths {
  "/health": {
    get: {
      responses: {
        200: HealthResponse;
      };
    };
  };
}
