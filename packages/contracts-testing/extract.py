import json
import glob
from sha3 import keccak_256

functionHashes = open("extract/functionHashes.txt", "w+")
for file in list(glob.glob("build/contracts/*.json")):
    reader = open(file)
    j = json.load(reader)

    index_of_dot = reader.name.index(".")
    file_name_without_extension1 = reader.name[:index_of_dot]
    file_name_without_extension = file_name_without_extension1.split("/")[-1]

    f = open("extract/" + file_name_without_extension + ".abi.txt", "w+")
    f.write(json.dumps(j["abi"]))
    f.close

    f = open("extract/" + file_name_without_extension + ".bytecode.txt", "w+")
    f.write(j["bytecode"])
    f.close

    abi = j["abi"]

    functionSelector = []
    for fields in abi:
        if fields["type"] == "function":
            functionName = fields["name"]
            functionInputs = []
            for inputs in fields["inputs"]:
                functionInputs.append(inputs["type"])
            functionSelector.append([functionName, functionInputs])
    for functions in functionSelector:
        functionName = functions[0]
        functionType = functions[1]
        s = functionName + "("
        for i in range(len(functionType)):
            s += functionType[i]
            if i + 1 < len(functionType):
                s += ","
        s += ")"
        sha3_hash = keccak_256(s.encode("utf-8")).hexdigest()
        ss = "functionHashes.set('" + sha3_hash[:8] + "', '" + s + "');"
        print(ss, file=functionHashes)

functionHashes.close
