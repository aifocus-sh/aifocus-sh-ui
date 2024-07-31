import json
import argparse

from llama_cpp import Llama

parser = argparse.ArgumentParser()
parser.add_argument("-m", "--model", type=str, default="./models/mistral-7b-instruct-v0.2.Q4_K_M.gguf")
args = parser.parse_args()

llm = Llama(model_path=args.model)

stream = llm(
    "Question: What are the names of the planets in the solar system? Answer: ",
    max_tokens=48,
    stop=["Q:", "\n"],
    stream=True,
)

for output in stream:
    print(json.dumps(output, indent=2))