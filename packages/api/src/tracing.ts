// OpenTelemetry
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { ZipkinExporter } from "@opentelemetry/exporter-zipkin";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { ConsoleSpanExporter } from "@opentelemetry/sdk-trace-node";

// instrumentations
import { HapiInstrumentation } from "@opentelemetry/instrumentation-hapi";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { PgInstrumentation } from "@opentelemetry/instrumentation-pg";

const SERVICE_NAME = "technical-challenge-api";
const { ZIPKIN_URL } = process.env;

const exporter = ZIPKIN_URL
  ? new ZipkinExporter({
      serviceName: SERVICE_NAME,
      url: process.env.ZIPKIN_URL,
    })
  : new ConsoleSpanExporter();

const sdk = new NodeSDK({
  serviceName: SERVICE_NAME,
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: SERVICE_NAME,
  }),
  traceExporter: exporter,
  instrumentations: [
    getNodeAutoInstrumentations(),
    new HapiInstrumentation(),
    new HttpInstrumentation(),
    new PgInstrumentation(),
  ],
});

sdk.start();
