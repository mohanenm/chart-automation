### For everything to work correctly, make sure add these formulas to you sheets:

* To grab most recent data from form responses: 
```
=INDIRECT(CONCATENATE("form-submission!A2",ArrayFormula(max(if(len('form-submission'!A2:A),row('form-submission'!A2:A),))),":Z",ArrayFormula(max(if(len('form-submission'!A2:A),row('form-submission'!A2:A),)))))
```
* To grab data from form-data: 
Chart Title:
```
=IF('form-data'!E1<>"",transpose(SPLIT('form-data'!E1,",")), "") 
```

Slice Names:
```
=IF('form-data'!B1<>"",transpose(SPLIT('form-data'!B1,",")), "")
```
Slice Data:
```
=IF('form-data'!C1<>"",transpose(SPLIT('form-data'!C1,",")), "")
```
Email: 
```
=IF('form-data'!F1<>"",transpose(SPLIT('form-data'!F1,",")), "")
```
